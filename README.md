# Backend Money Lover Ristek

Follow these steps to set up the backend project:

1. **Clone Repository:**
   - Clone the repository and navigate to the root folder.
     ```bash
     git clone https://github.com/alifismady/be-moneylover-ristek.git
     cd be-moneylover-ristek
     ```

2. **Install Dependencies:**
   - Run npm install in the terminal.
     ```bash
     npm install
     ```

3. **Configure Environment Variables:**
   - Create a `.env` file in the root directory.
   - Copy the values from `.envexample` and replace them with correct values (Default PORT used will be 3001 since the frontend is configured to use 3001 but you can always change this)
     
4. **Start the Application:**
   - Run the application with npm run start.
     ```bash
     npm run start
     ```

5. **Ensure Port Availability:**
   - Verify that port 3001 is not in use. If it is, change the value of PORT in the `.env` file to an available port.