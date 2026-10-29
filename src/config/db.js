import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION)
        console.log('Connected Database Success')
    } catch (error) {
        console.error('Loi khi ket noi database', error)
        process.exit(1)        
    }
}

export default connectDB;