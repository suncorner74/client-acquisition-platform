import { Router } from 'express'
import { createLead, listLeads } from '../controllers/leadController.js'
const router = Router()

router.post('/', createLead)
router.get('/', listLeads)

export default router
