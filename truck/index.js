import express from "express";
import parcelRouter from "./routes/parcel";
import truckRouter from "./routes/truck";

const app = express();
app.use(express.json());

app.use('/parcels', parcelRouter);
app.use('/trucks', truckRouter);

app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
})

app.listen(3003, () => {
    console.log('Server is running on port 3000');
})

export default app;
