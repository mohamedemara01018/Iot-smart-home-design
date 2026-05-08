# Smart Home IoT Frontend

Modern React + Vite dashboard for the Smart Home IoT backend.

## Run

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Backend API

The axios service is already prepared for:

```text
http://localhost:8000
```

When opening the dashboard from another device or LAN address, create a `.env`
file and set your backend address:

```env
VITE_API_URL=http://192.168.100.5:8000
```

If `VITE_API_URL` is not set, the app automatically calls the same host on port
`8000`, for example `http://192.168.100.5:8000`.
