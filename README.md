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
Update email state

Note:
For this project, these endpoints are intentionally CSRF-exempt.

## JavaScript Overview (`script.js`)

### `load_mailbox(mailbox)`
Loads and renders the selected mailbox (Inbox, Sent, or Archive).

---

### `compose_email()`
Displays the compose form and resets all input fields.

---

### `compose_email_btn(e)`
Handles the email submission process using a **POST** request.

---

### `each_email_show(id)`
Opens a single email, shows all details, and marks the email as **read**.

---

### `reply_email(id)`
Automatically fills the reply form with:
- the original sender as the recipient  
- the subject (prepends **Re:** only if not already present)  
- a quoted version of the original message including timestamp  

---

### **Archiving Functions**

#### `make_archived(id)`
Archives the selected email.

#### `make_unarchived(id)`
Unarchives the selected email.




