import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },

  recipes: { type:[
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
      name: { type: String, required: true }
    }
  ], required:false},

  createdAt: { type: Date, default: Date.now }
});

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
export default Event;
