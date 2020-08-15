This application is a virtual Queue Management system. 

## Users
Below are details about the various classes of users and their functionality.

### Normal User
Username: `user`
Password: `user`

There are two types of normal users, a regular user and a store manager. Both have the same level of permissions to access functionality in the app.

#### Regular User
Once you have logged in, you will be taken to the store search page. Here you can view the complete list of stores available, search through them using available filters such as wait time and favorited only stores. The filters and sort options are available as a popup from a button to the right of the search bar. You can also navigate the map to view a list of stores currently meeting the search criteria. You can also mark a store as "favorited" and view whether or not the store has been verified by the admins, by a check mark. Once a store has been decided on, you can click on either "Join Queue" or "View Data" of that store card. "Join Queue" takes you to the queue status page where you can view the live status of your position in the queue, a unique ID assigned to you and a QR code to verify your status. "View Data" will take you to the store analytics page where you can view information about the store. Independent of all this, you may view your personal settings by clicking the "Settings" button on the top right. Here, you may edit your credentials, deactivate your account. You may save your changes by clicking on the green "Save" button.

#### Store manager
If you are a store manager, you may create your own store by clicking on the button in the settings page. If you create a store, you may edit the settings for the store, i.e. the name, address and modify the list of employees by their username. At any point, you may save either the user settings or the store settings by clicking on the green "Save" button on the top right of the section. Once you have created your store, you may go to the "Queue Dashboard" page by using the header navigation. This allows you to record any users exiting/entering the store. "In" records users entering the store, and "Out" records users exiting the store. You may view details about the current status of the store and users in queue live. You may also close or clear the queue. Scanning the QR code will allow you to verify a user's position in the queue.

### Admin user
Username: `admin`
Password: `admin`

The admin user has one core functionality that can be accessed by clicking the "Admin Panel" button on the header. This takes you to a page where you view all the list of stores and users that have been created. A search functionality similar to the store search functionality has been implemented for convenience. This can be thought of as a visual representation of our database. Here, you may click "Edit" on any card to edit the store/user information. This takes you to a page similar to the settings page where you may edit the specific details of the user/store. This is to be used for administration purposes. In addition, an admin user can perform the full range of functionality that any regular user can perform.

Thank you for using our app.
