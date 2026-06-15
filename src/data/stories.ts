import type { Story } from './types';

export const stories: Story[] = [
  {
    id: 's1',
    slug: 'co-hlan-nguoi-giu-nghe-dan',
    kind: 'artisan',
    title: 'Cô H’Lan — người giữ nghề đan',
    person: 'Cô H’Lan, 52 tuổi',
    location: 'Buôn Ma Thuột, Đắk Lắk',
    excerpt:
      'Cô H’Lan học đan mây từ bà ngoại khi mới lên mười. Giờ cô là người cuối cùng trong buôn còn giữ những đường đan cũ.',
    body: [
      'Sáng nào cô H’Lan cũng dậy từ 5 giờ, ra sau nhà lấy bó mây đã phơi đủ nắng. “Mây phải khô vừa, đan mới mềm tay mà không gãy,” cô nói, hai bàn tay chai sạn thoăn thoắt luồn từng sợi.',
      'Trước đây giỏ của cô chỉ bán được cho khách quen trong buôn, mỗi tháng vài chiếc. Từ khi com-passion đưa giỏ lên mạng, cô nhận đơn đều đặn hơn, đủ để lo cho hai đứa cháu đang đi học.',
      'Mỗi chiếc giỏ bạn mua giúp cô có thêm lý do để ngồi xuống, tiếp tục đan, và truyền lại nghề cho lớp trẻ trong buôn.',
    ],
    art: { from: '#d9b26f', to: '#b88a4a', emoji: '👵', realPhotoNote: 'Chân dung cô H’Lan đang đan mây trước hiên nhà, ánh sáng sáng sớm' },
  },
  {
    id: 's2',
    slug: 'chu-tu-va-ganh-hang-dem',
    kind: 'artisan',
    title: 'Chú Tư và gánh hàng đêm',
    person: 'Chú Tư, 60 tuổi',
    location: 'Long An',
    excerpt:
      'Nhiều năm chú Tư ngồi bán giỏ cỏ bàng bên lề đường tới tận khuya. Giờ khách có thể mua online — chú đỡ một đêm sương gió.',
    body: [
      'Hơn hai mươi năm, gánh hàng của chú Tư là cái đèn dầu nhỏ và chồng giỏ cỏ bàng bên vỉa hè. Có đêm bán hết, có đêm ngồi tới 1 giờ sáng mới về.',
      '“Tui không rành điện thoại, nhưng tụi nhỏ ở dự án chụp hình giỏ rồi đăng lên giùm. Giờ có người ở tận Hà Nội đặt mua,” chú cười.',
      'Thay vì phải tìm đến tận nơi chú ngồi bán, bạn chỉ cần đặt một chiếc giỏ trên web. Với chú, đó là một đêm được về sớm hơn, ngủ ngon hơn.',
    ],
    art: { from: '#cfe3d6', to: '#3a8062', emoji: '👴', realPhotoNote: 'Chú Tư bên gánh hàng rong buổi đêm, đèn vàng ấm' },
  },
  {
    id: 's3',
    slug: 'bua-trua-o-truong-buon',
    kind: 'school',
    title: 'Bữa trưa ở trường buôn',
    person: 'Lớp 3, Trường Tiểu học Ea Tu',
    location: 'Buôn Ma Thuột, Đắk Lắk',
    excerpt:
      'Một phần lợi nhuận mỗi chiếc giỏ trở thành bữa trưa nóng cho các em nhỏ vùng cao đang tới trường.',
    body: [
      'Ở điểm trường Ea Tu, nhiều em nhỏ 8–10 tuổi đi bộ vài cây số tới lớp, buổi trưa thường chỉ có cơm trắng mang theo từ nhà.',
      'Từ quỹ của dự án, các em có thêm bữa trưa với rau, trứng và thịt — đủ no để học buổi chiều. “Con thích nhất hôm có canh,” một em nói, miệng vẫn còn dính cơm.',
      'Mỗi đơn hàng của bạn được ghi lại minh bạch, và một phần được chuyển thẳng thành những bữa ăn như thế này.',
    ],
    art: { from: '#fbe7d7', to: '#e07a3f', emoji: '🍱', realPhotoNote: 'Các em nhỏ 8–10 tuổi vùng cao đang ăn trưa ở trường, khung cảnh ấm áp' },
  },
];

export const getStory = (slug: string) => stories.find((s) => s.slug === slug);
