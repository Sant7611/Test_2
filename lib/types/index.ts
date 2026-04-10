export type User = {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
};

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type CreatePostInput = {
  title: string;
  body: string;
  userId: number;
};
