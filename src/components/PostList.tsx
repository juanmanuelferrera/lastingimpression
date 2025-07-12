import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';

const posts = [
  { title: 'What is Krishna consciousness', date: '2021-06-08' },
  { title: 'Why God allows people to die young', date: '2021-06-14' },
  { title: 'Moon landing, reincarnation and science', date: '2021-06-17' },
];

const PostList = () => (
  <List>
    {posts.map((post, idx) => (
      <React.Fragment key={post.title}>
        <ListItem button component="a" href="#">
          <ListItemText
            primary={post.title}
            secondary={new Date(post.date).toLocaleDateString()}
          />
        </ListItem>
        {idx < posts.length - 1 && <Divider />}
      </React.Fragment>
    ))}
  </List>
);

export default PostList; 