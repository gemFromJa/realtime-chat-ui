type User = {
    _id: String;
    username: String;
    name: String;
};

type Translation = {
    message: String;
    lang: String;
};

type Message = {
    message: String;
    date: Date;
    user_id: User;
    lang: String;
    translations: [Translation];
};
