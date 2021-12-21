type ServerMessage = {
  chatroom_id: number;
  content: string;
  created_at: string;
  id: number;
  updated_at: string;
  user_id: number;
  user: {
    created_at: string;
    first_name: null | string;
    id: number;
    last_name: null | string;
    password: string;
    updated_at: string;
    username: string;
  };
};

export default ServerMessage;
