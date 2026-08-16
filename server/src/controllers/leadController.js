import Lead from '../models/Lead.js'
import { sendLeadEmails } from '../services/emailService.js'

export async function createLead(req,res,next) {
  try {
    const {name,email,projectType,budget,timeline,message} = req.body
    if (!name || !email || !projectType || !budget || !timeline || !message)
      return res.status(400).json({success:false,message:'Please complete all required fields.',errors:[]})

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({success:false,message:'Please enter a valid email address.',errors:[]})

    const lead = await Lead.create(req.body)
    await sendLeadEmails(lead)
    res.status(201).json({success:true,message:'Lead submitted successfully.',data:{id:lead._id}})
  } catch(err) { next(err) }
}

export async function listLeads(req,res,next) {
  try {
    const leads = await Lead.find().sort({createdAt:-1})
    res.json({success:true,data:leads})
  } catch(err) { next(err) }
}
