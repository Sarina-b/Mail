# Django Mail — Email Client Project

This project is a fully interactive email client built with Django on the backend and JavaScript on the frontend.
It allows users to register, log in, send emails, view mailboxes, archive messages, reply to emails,
and dynamically interact with the interface without full page reloads.

---

## Project Structure
```
├── mail/
│   ├── migrations/                
│   ├── static/mail/               
│   │   ├── script.js
│   │   └── styles.css
│   ├── templates/mail/            
│   │   ├── inbox.html
│   │   ├── layout.html
│   │   ├── login.html
│   │   ├── register.html
│   │   └── email.html
│   ├── models.py                  
│   ├── views.py                   
│   ├── urls.py                    
│   └── admin.py
├── project3/
│   ├── settings.py                
│   ├── urls.py                    
│   ├── wsgi.py / asgi.py
├── templates/                     
├── manage.py

```

---

## 🚀 Features

### **Authentication**
- Register, log in, and log out  
- Password confirmation & duplicate email validation  

### **Email Actions**
- Compose and send emails  
- View **Inbox**, **Sent**, and **Archive**  
- Read full email details  
- Reply to emails with auto-filled context  
- Emails marked as **read** when opened  
- Archive / unarchive emails instantly  

### **Dynamic Frontend (Single-page behavior)**
- Mailboxes load without page reload  
- Email previews built dynamically with JS  
- Event listeners for clicks, archiving, replying  
- Uses `fetch()` for all server communication  

---

## 🔌 API Endpoints

### `GET /emails/<mailbox>`
Returns all emails in:
- inbox  
- sent  
- archive  

### `GET /emails/<id>`
Returns complete email details.

### `POST /emails`
Create and send an email:
```json
{
  "recipients": "example@mail.com",
  "subject": "Hello",
  "body": "Message here"
}
```
### `PUT /emails/<id>`
Update email state:
```json
{ "read": true }
```

```json
{ "archived": true }
```
```json
{ "archived": false }
```

Note:
For this project, these endpoints are intentionally CSRF-exempt.




