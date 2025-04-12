import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: [2, 'Subscription name must be at least 3 characters long'],
        maxLength: [100, 'Subscription name must be at most 50 characters long'],
    },

    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Subscription price must be at least 0'],
        
    },

    currency: {
        type: String,
        required: [true, 'Subscription currency is required'],
        enum: ['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD'],
        default: 'INR',
    },

    frequency: {
        type: String,
        enum: ['daily','weekly', 'monthly', 'yearly'],
      
    },
    category: {
        type: String,
        enum: ['entertainment', 'education', 'health', 'software', 'other'],
        required: [true, 'Subscription category is required'],
    },

    paymentMethod: {
        type: String,
       required: true,
       trim: true,
    },

    status: {
        type: String,
        enum: ['active', 'inactive', 'cancelled'],
        default: 'active',
    },

    startDate: {
        type: Date,
        required: [true, 'Subscription start date is required'],
        validate :{
            validator: (value) => value <= new Date(), 
            message: 'Start date must be in the past',
        }
    },

    renewalDate: {
        type: Date,
        required: true,
        validate :{
            validator: function(value){
                return value > this.startDate; // Ensure renewal date is after start date
            } ,
            message: 'Renewal date must be after start date',
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
        index: true,
    },
}, { timestamps: true });

//Auto calculate the renewal date if missing
subscriptionSchema.pre('save', function(next) {
    if(!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if(this.renewalDate < new Date()){
        this.status = 'expired'; // Set status to expired if renewal date is in the past
    }

    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;