Build & Deploy Ứng dụng ghi chú Fullstack (React, NodeJS, GraphQL, MongoDB, Firebase)

Cách để xây dựng một ứng dụng Fullstack, phần UI sẽ sử dụng ReactJS và Marterial UI phần backend sẽ sử dụng NodeJS. Chúng ta sẽ học cách cấu hình GraphQL server và thao tác dữ liệu trong MongoDB.

👉 Tính năng
- Đăng nhập bằng Google thông qua Firebase
- Cấu hình và sử dụng GraphQL
- Xử lý access token
- Thao tác và sử dụng MongoDB
- Thực hành chức năng Push Notification
- Deploy code lên Netlify và Render

📚 Kiến thức đạt được
- Context API
- React Router DOM
- React Hooks
- Marterial UI
- Firebase Authentication
- Thao tác với MongoDB
- GraphQL

<!-- Setup -->
<!-- server
    npm init --yes
    npm i --save @apollo/server express http cors body-parser
    npm i nodemon --save
    npm i --save mongoose
    npm i --save firebase-admin

 -->

<!-- client
    npx i create vite@latest
    npm i --save eslint-config-react-app
    npm i --save react-router-dom
    npm install @mui/material @emotion/react @emotion/styled
    npm i --save @fontsource/roboto
    npm i --save @mui/icons-material
    npm install --save react-draft-wysiwyg draft-js
    npm i draftjs-to-html

 -->

<!-- Kiến thức chung 
- về graphql(tạo schema) có 3 options type:
    + Query : hoạt động cho các truy vấn từ client mà muốn lấy dữ liệu
    + Mutation : update hay xóa dữ liệu j đó
    + Subscription : khi client muốn update theo dạng real time
- Trong từng resolver có 4 tham số:
    + parent : 
    + args : 
    + context : 
    + info : 
- decoded token ở bước middleware khi getAuth
    + các thuộc tính nhận đc {
        name,      
        picture: ,
        iss: 'https://securetoken.google.com/note-app-9e65f',
        aud: 'note-app-9e65f',  auth_time: 1720103803,  user_id: 'p7mdxiqYXrMUfaq5aLmYFR8M38x2',      
        sub: 'p7mdxiqYXrMUfaq5aLmYFR8M38x2',
        iat: 1720237863,      
        exp: 1720241463,      
        email: ,
        email_verified: true, 
        firebase: {
            identities: { 'google.com': [Array], email: 
        [Array] },
            sign_in_provider: 'google.com'
        },
        uid: 'p7mdxiqYXrMUfaq5aLmYFR8M38x2'
    }

-->