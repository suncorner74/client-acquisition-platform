import mongoose from 'mongoose'

const leadSchema = new mongoose.Schema({
  name: {type:String, required:true, trim:true, maxlength:120},
  email: {type:String, required:true, trim:true, lowercase:true, maxlength:180},
  phone: {type:String, trim:true, maxlength:40},
  company: {type:String, trim:true, maxlength:150},
  projectType: {type:String, required:true, maxlength:80},
  budget: {type:String, required:true, maxlength:80},
  timeline: {type:String, required:true, maxlength:80},
  message: {type:String, required:true, maxlength:5000},
  source: {type:String, trim:true, maxlength:120},
  status: {type:String, enum:['New','Contacted','Qualified','Proposal Sent','Won','Lost'], default:'New'},
  adminNotes: {type:String, maxlength:5000}
},{timestamps:true})

export default mongoose.model('Lead',leadSchema)
