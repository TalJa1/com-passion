import type { ImpactStat, Report, UpcomingProject } from './types';

export const impactStats: ImpactStat[] = [
  { key: 'sold', label: 'Sản phẩm đã bán', value: 1248, emoji: '🧺' },
  { key: 'funds', label: 'Đã tích luỹ cho cộng đồng', value: 86, suffix: ' triệu₫', emoji: '💚' },
  { key: 'artisans', label: 'Cô chú nghệ nhân đồng hành', value: 14, emoji: '🤲' },
  { key: 'children', label: 'Em nhỏ được hỗ trợ bữa trưa', value: 92, emoji: '🧒' },
  { key: 'meals', label: 'Bữa trưa đã trao tới trường', value: 5400, emoji: '🍱' },
];

export const reports: Report[] = [
  {
    id: 'r-2026-05',
    period: 'Tháng 5, 2026',
    title: 'Báo cáo minh bạch tháng 5/2026',
    summary:
      'Tháng 5 dự án bán được 312 chiếc giỏ. Toàn bộ dòng tiền được phân bổ và công khai bên dưới.',
    totalRaised: 18600000,
    allocations: [
      { label: 'Trả công nghệ nhân', amount: 11160000, color: '#3a8062' },
      { label: 'Bữa trưa cho trường', amount: 3720000, color: '#e07a3f' },
      { label: 'Nguyên vật liệu & vận hành', amount: 2790000, color: '#d9b26f' },
      { label: 'Quỹ dự phòng', amount: 930000, color: '#cfe3d6' },
    ],
    invoiceLabel: 'Hoá đơn & sao kê T5-2026.pdf',
  },
  {
    id: 'r-2026-04',
    period: 'Tháng 4, 2026',
    title: 'Báo cáo minh bạch tháng 4/2026',
    summary:
      'Tháng 4 ghi nhận 268 đơn hàng. Lần đầu mở rộng hỗ trợ sang điểm trường thứ hai.',
    totalRaised: 15900000,
    allocations: [
      { label: 'Trả công nghệ nhân', amount: 9540000, color: '#3a8062' },
      { label: 'Bữa trưa cho trường', amount: 3180000, color: '#e07a3f' },
      { label: 'Nguyên vật liệu & vận hành', amount: 2385000, color: '#d9b26f' },
      { label: 'Quỹ dự phòng', amount: 795000, color: '#cfe3d6' },
    ],
    invoiceLabel: 'Hoá đơn & sao kê T4-2026.pdf',
  },
];

export const upcoming: UpcomingProject[] = [
  {
    id: 'u1',
    title: 'Bộ sưu tập “Mùa cà phê”',
    startDate: '2026-07-01',
    note: 'Giỏ đựng quà mùa thu hoạch cà phê, phối màu hạt rang.',
    art: { from: '#f3e7cf', to: '#c45f2e', emoji: '☕' },
  },
  {
    id: 'u2',
    title: 'Góc bếp vùng cao',
    startDate: '2026-08-15',
    note: 'Khay, lót nồi và đồ bếp đan tay từ cỏ bàng.',
    art: { from: '#eef5ef', to: '#3a8062', emoji: '🍯' },
  },
  {
    id: 'u3',
    title: 'Học bổng “Tới trường”',
    startDate: '2026-09-05',
    note: 'Trích quỹ tặng cặp sách đầu năm cho 50 em nhỏ.',
    art: { from: '#fbe7d7', to: '#e07a3f', emoji: '🎒' },
  },
];

export const formatVNDfull = (n: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n);
