import type { Art } from '../data/types';

interface Props {
  art: Art;
  ratio?: string; // e.g. "4 / 3"
  rounded?: boolean;
  className?: string;
  label?: string;
}

/**
 * Ảnh minh hoạ tạm (gradient + emoji) cho tới khi có ảnh thật.
 * art.realPhotoNote mô tả ảnh thật cần chụp.
 */
export default function Photo({ art, ratio = '4 / 3', rounded = true, className = '', label }: Props) {
  return (
    <div
      className={`photo ${rounded ? 'photo--rounded' : ''} ${className}`}
      style={{
        aspectRatio: ratio,
        background: `linear-gradient(135deg, ${art.from}, ${art.to})`,
      }}
      role="img"
      aria-label={art.realPhotoNote ?? label ?? 'Hình minh hoạ'}
      title={art.realPhotoNote}
    >
      <span className="photo__emoji" aria-hidden="true">
        {art.emoji}
      </span>
      {label && <span className="photo__label">{label}</span>}
      {art.realPhotoNote && <span className="photo__pending" aria-hidden="true">ảnh minh hoạ</span>}
    </div>
  );
}
