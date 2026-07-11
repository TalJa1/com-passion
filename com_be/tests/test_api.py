from tests.conftest import login


async def test_health(client):
    resp = await client.get("/api/health")
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok"}


async def test_list_products(client, seeded_products):
    resp = await client.get("/api/products")
    assert resp.status_code == 200
    data = resp.json()
    assert len(data) == 2

    first = data[0]
    assert first["name"] == "Giỏ mây Buôn Bản"
    assert first["price"] == 185000
    assert first["art"] == {"from": "#d9b26f", "to": "#b88a4a", "emoji": "🧺"}
    assert first["storySlug"] == "co-hlan-nguoi-giu-nghe-dan"
    assert "story_slug" not in first  # camelCase only

    resp = await client.get("/api/products", params={"category": "phu-kien"})
    assert [p["id"] for p in resp.json()] == ["p5"]

    resp = await client.get("/api/products", params={"q": "long an"})
    assert [p["id"] for p in resp.json()] == ["p5"]

    resp = await client.get("/api/products", params={"featured": "true"})
    assert [p["id"] for p in resp.json()] == ["p1"]

    resp = await client.get("/api/products/khong-ton-tai")
    assert resp.status_code == 404


async def test_create_order_decrements_stock(client, seeded_products, db_session_factory):
    headers = await login(db_session_factory)

    resp = await client.post(
        "/api/orders",
        json={"items": [{"productId": "p1", "qty": 2}, {"productId": "p5", "qty": 1}], "donation": 5000},
        headers=headers,
    )
    assert resp.status_code == 201, resp.text
    order = resp.json()
    assert order["id"].startswith("ORD-")
    assert order["total"] == 2 * 185000 + 95000 + 5000
    assert order["donation"] == 5000
    assert sorted(i["name"] for i in order["items"]) == ["Giỏ mini để bàn", "Giỏ mây Buôn Bản"]

    resp = await client.get("/api/products/gio-may-buon-ban")
    assert resp.json()["stock"] == 3  # was 5, bought 2

    # Order appears in history, newest first, and counts toward contribution.
    resp = await client.get("/api/orders", headers=headers)
    assert [o["id"] for o in resp.json()] == [order["id"]]

    resp = await client.get("/api/me/contribution", headers=headers)
    assert resp.json() == {"total": order["total"]}


async def test_create_order_insufficient_stock(client, seeded_products, db_session_factory):
    headers = await login(db_session_factory)

    resp = await client.post(
        "/api/orders",
        json={"items": [{"productId": "p5", "qty": 3}], "donation": 0},
        headers=headers,
    )
    assert resp.status_code == 409

    # Stock unchanged after the rejected order.
    resp = await client.get("/api/products/gio-mini-de-ban")
    assert resp.json()["stock"] == 2

    resp = await client.post(
        "/api/orders",
        json={"items": [{"productId": "khong-co", "qty": 1}], "donation": 0},
        headers=headers,
    )
    assert resp.status_code == 404


async def test_orders_require_auth(client):
    resp = await client.get("/api/orders")
    assert resp.status_code == 401
