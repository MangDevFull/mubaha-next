
import ContentLoader from 'react-content-loader';

export default function PostLoader() {
  return (
    <ContentLoader className="skeleton-svg" speed={10}>
      <rect className="skeleton-img" x="2" y="2" rx="0" ry="0" />
      <rect className="skeleton-c1" x="0" rx="0" ry="0" />
      <rect className="skeleton-c2" x="0" rx="0" ry="0" />
      <rect className="skeleton-c3" x="0" rx="0" ry="0" />
    </ContentLoader>
  )
}
