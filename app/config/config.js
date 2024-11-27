

// export const MONGODB_CONNECTION="mongodb+srv://mrrabbil:mernx123@cluster0.rtpbcy6.mongodb.net/app_todo?retryWrites=true&w=majority";
export const MONGODB_CONNECTION="mongodb+srv://mdfawjulazim:mdfawjulazim123@cluster.szrub.mongodb.net/TaskManagerProject";


export const JWT_SECRET = "5EC7CEFA1BE7C9354A639369A2AA8JS";
export const JWT_EXPIRATION_TIME = 60*60*24*30;

// export const EMAIL_HOST = "sandbox.smtp.mailtrap.io";
// export const EMAIL_PORT = "2525";
// export const EMAIL_USER = "ffd3655ea4cb6f";
// export const EMAIL_PASSWORD = "9eec6de13aba90";
// export const MAIL_ENCRYPTION=""; //as needed for the mailtrap

//if you use your own email
export const EMAIL_HOST = "smtp.gmail.com";
export const EMAIL_PORT = "587";
export const EMAIL_USER = "mdfawjulazim617@gmail.com";
export const EMAIL_PASSWORD = "vkvbeppgoneanlcs";
export const MAIL_ENCRYPTION="tls"; //as needed for the mailtrap

// পোর্ট 465: SSL দিয়ে ইমেইল এনক্রিপশন।
// পোর্ট 587: STARTTLS দিয়ে TLS এনক্রিপশন।
// পোর্ট 25: পুরোনো SMTP রিলেই পোর্ট, যা এখন সার্ভার টু সার্ভার ইমেইল আদান-প্রদানের জন্য ব্যবহৃত হয়।

export const Max_JSON_SIZE = "50mb";
export const URL_ENCODER = true;


export const REQUEST_LIMIT_TIME = 15*60*1000;//15 min
export const REQUEST_LIMIT_NUMBER =3000;//per 15 Min 3000 Requests Allowed


export const WEB_CACHE=false;
export const PORT=5050;
