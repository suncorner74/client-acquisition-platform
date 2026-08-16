const Lead = require('../models/Lead');
const Project = require('../models/Project');

const getSummaryStats = async (req, res, next) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: 'New' });
    const qualifiedLeads = await Lead.countDocuments({ status: 'Qualified' });
    const wonLeads = await Lead.countDocuments({ status: 'Won' });
    const lostLeads = await Lead.countDocuments({ status: 'Lost' });
    const totalProjects = await Project.countDocuments();

    res.json({
      success: true,
      data: {
        publicStats: {
          yearsExperience: "8+",
          projectsDelivered: totalProjects > 0 ? (35 + totalProjects) : "35+",
          clientSatisfaction: "99%",
          avgDeliveryTime: "2-4 Weeks"
        },
        adminCrmStats: {
          totalLeads,
          newLeads,
          qualifiedLeads,
          wonLeads,
          lostLeads,
          conversionRate: totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) + '%' : '0%'
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSummaryStats };
