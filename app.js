const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8000;
mongoose.connect('mongodb://localhost:27017/doctorDB')
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));
const doctorSchema = new mongoose.Schema({
    name: String,
    specialty: String,
    status: String,
    image: String
});
const Doctor = mongoose.model('Doctor', doctorSchema);
app.set('view engine', 'ejs');
app.set('views', './views'); 
app.use('/images', express.static('images'));
// app.get('/doctors', async (req, res) => {
    app.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        console.log("Doctors retrieved successfully:", doctors);
        res.render('doctors', { doctors });
    } catch (error) {
        console.error("Detailed error retrieving doctors:", error.message); 
        res.status(500).send("Error retrieving doctors");
    }
});

app.listen(port, () => {
    console.log(`Doctor appointment API running on http://localhost:${port}`);
});

