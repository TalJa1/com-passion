import React from 'react';
import './Skeleton.css';

export function Skeleton({ 
  className = '', 
  style = {} 
}: { 
  className?: string;
  style?: React.CSSProperties;
}) {
  return <div className={`skeleton ${className}`} style={style} />;
}

export function SkeletonText({ lines = 1, className = '', style = {} }: { lines?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', ...style }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          className={`skeleton-text ${className}`} 
          style={{ width: i === lines - 1 && lines > 1 ? '70%' : '100%' }} 
        />
      ))}
    </div>
  );
}

export function SkeletonTitle({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) {
  return <Skeleton className={`skeleton-title ${className}`} style={style} />;
}

export function SkeletonImage({ ratio = '1 / 1', className = '', style = {} }: { ratio?: string; className?: string; style?: React.CSSProperties }) {
  return <Skeleton className={`skeleton-image ${className}`} style={{ aspectRatio: ratio, ...style }} />;
}

export function SkeletonCard() {
  return (
    <div className="pcard" style={{ padding: 0 }}>
      <SkeletonImage ratio="1 / 1" style={{ borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }} />
      <div className="pcard__body">
        <SkeletonText lines={1} style={{ width: '40%', marginBottom: '0.5rem' }} />
        <SkeletonTitle style={{ height: '1.5rem', marginBottom: '0.5rem' }} />
        <SkeletonText lines={2} style={{ marginBottom: '1rem' }} />
        <div className="pcard__foot">
          <SkeletonText lines={1} style={{ width: '30%', height: '1.5rem' }} />
          <Skeleton style={{ width: '80px', height: '2rem', borderRadius: 'var(--radius-pill)' }} />
        </div>
      </div>
    </div>
  );
}

export function SkeletonProductDetail() {
  return (
    <div className="pdp">
      <div className="pdp__media">
        <SkeletonImage ratio="1 / 1" />
      </div>
      <div className="pdp__info">
        <div className="pdp__meta">
          <Skeleton style={{ width: '100px', height: '24px', borderRadius: 'var(--radius-pill)' }} />
          <Skeleton style={{ width: '120px', height: '24px', borderRadius: 'var(--radius-pill)' }} />
        </div>
        <SkeletonTitle style={{ height: '3rem', width: '80%' }} />
        <Skeleton style={{ height: '2rem', width: '40%', marginBottom: '1.2rem' }} />
        <SkeletonText lines={4} />
        
        <ul className="pdp__specs" style={{ marginTop: '2rem' }}>
          <li><SkeletonText lines={1} style={{ width: '100%' }} /></li>
          <li><SkeletonText lines={1} style={{ width: '100%' }} /></li>
          <li><SkeletonText lines={1} style={{ width: '100%' }} /></li>
        </ul>

        <div className="pdp__buy">
          <Skeleton style={{ width: '120px', height: '48px', borderRadius: 'var(--radius-pill)' }} />
          <Skeleton style={{ flex: 1, height: '48px', borderRadius: 'var(--radius-pill)' }} />
        </div>
      </div>
    </div>
  );
}

export function SkeletonStory({ isRev = false }: { isRev?: boolean }) {
  return (
    <div className={`feature ${isRev ? 'feature--rev' : ''}`}>
      <div className="feature__media">
        <SkeletonImage ratio="4 / 3" />
      </div>
      <div className="feature__text">
        <Skeleton style={{ width: '80px', height: '24px', borderRadius: 'var(--radius-pill)', marginBottom: '0.5rem' }} />
        <SkeletonTitle style={{ height: '2.5rem', width: '80%' }} />
        <Skeleton style={{ width: '60%', height: '1.2rem', marginBottom: '1rem' }} />
        <SkeletonText lines={3} style={{ marginBottom: '1rem' }} />
        <Skeleton style={{ width: '100px', height: '2rem', borderRadius: 'var(--radius-pill)' }} />
      </div>
    </div>
  );
}

export function SkeletonStoryDetail() {
  return (
    <div className="article">
      <header className="article__head">
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <Skeleton style={{ width: '100px', height: '24px', borderRadius: 'var(--radius-pill)', margin: '0 auto 1rem' }} />
          <SkeletonTitle style={{ height: '3rem', width: '80%', margin: '0 auto 1rem' }} />
          <Skeleton style={{ width: '50%', height: '1.5rem', margin: '0 auto' }} />
        </div>
      </header>
      <div className="container">
        <SkeletonImage ratio="16 / 9" style={{ marginBottom: '3rem' }} />
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <SkeletonText lines={4} style={{ marginBottom: '2rem' }} />
          <SkeletonText lines={3} style={{ marginBottom: '2rem' }} />
          <SkeletonText lines={5} style={{ marginBottom: '2rem' }} />
        </div>
      </div>
    </div>
  );
}

export function SkeletonAccount() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card" style={{ padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
        <Skeleton style={{ width: '120px', height: '120px', borderRadius: '50%', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <SkeletonTitle style={{ height: '2.5rem', width: '50%', marginBottom: '1rem' }} />
          <SkeletonText lines={2} style={{ width: '80%' }} />
        </div>
      </div>
      <div className="grid cols-3" style={{ marginBottom: '2rem' }}>
        <Skeleton style={{ height: '100px', borderRadius: 'var(--radius-lg)' }} />
        <Skeleton style={{ height: '100px', borderRadius: 'var(--radius-lg)' }} />
        <Skeleton style={{ height: '100px', borderRadius: 'var(--radius-lg)' }} />
      </div>
      <Skeleton style={{ height: '300px', borderRadius: 'var(--radius-lg)' }} />
    </div>
  );
}
