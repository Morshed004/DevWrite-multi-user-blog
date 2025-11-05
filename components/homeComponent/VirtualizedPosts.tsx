import { List, AutoSizer } from 'react-virtualized';
import PostCard from './PostCard';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface VirtualizedPostsProps {
  posts: Post[];
}

export default function VirtualizedPosts({ posts }: VirtualizedPostsProps) {
  const postCardHeight = 250;

  const rowRenderer = ({
    key,
    index,
    style,
  }: {
    key: string;
    index: number;
    style: React.CSSProperties;
  }) => {
    const post = posts[index];
    
    return (
      <div key={key} style={style}>
        <div className="pb-8">
          <PostCard post={post} />
        </div>
      </div>
    );
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          width={width}
          height={height}
          rowCount={posts.length}
          rowHeight={postCardHeight + 32}
          rowRenderer={rowRenderer}
          overscanRowCount={3}
        />
      )}
    </AutoSizer>
  );
}