export const AUTOMATION_RULES = [
  {
    id: 'rule1',
    name: 'Missed Follow-up → Auto Task',
    description: 'When follow-up date has passed and lead status is not Converted/Closed, automatically create a task for the counselor.',
    trigger: { type: 'Time-based', condition: 'Follow-up date passed by 1+ days' },
    action: { type: 'Create Task', params: 'Follow up with [lead name] (Overdue follow-up)' },
    isActive: true,
    lastTriggered: '2026-05-19T08:00:00Z',
    triggerCount: 23
  },
  {
    id: 'rule2',
    name: 'New Lead → Assign Counselor',
    description: 'Automatically assign incoming leads from any source to counselors in a round-robin format.',
    trigger: { type: 'Lead Status Change', condition: 'Status becomes New Lead' },
    action: { type: 'Assign Counselor', params: 'Round-robin assignment' },
    isActive: true,
    lastTriggered: '2026-05-19T16:05:00Z',
    triggerCount: 142
  },
  {
    id: 'rule3',
    name: 'Broken Form Detected → Instant Alert',
    description: 'If a broken form submission error is logged on the website, immediately trigger a system notification to the Operations manager.',
    trigger: { type: 'Form Submission', condition: 'Form error or broken API submit' },
    action: { type: 'Send Notification', params: 'High Priority Alert: Website broken form submission' },
    isActive: true,
    lastTriggered: '2026-05-18T10:12:00Z',
    triggerCount: 3
  },
  {
    id: 'rule4',
    name: 'Lead Score >= 8 → Mark as Hot Lead',
    description: 'If lead score matches or exceeds 8 based on input responses, tag the lead as Hot Lead and alert counselor.',
    trigger: { type: 'Score Threshold', condition: 'Lead score >= 8' },
    action: { type: 'Update Lead Status', params: 'Tag Hot Lead & Send Alert' },
    isActive: true,
    lastTriggered: '2026-05-18T14:20:00Z',
    triggerCount: 38
  },
  {
    id: 'rule5',
    name: 'No Activity 7 Days → Follow-up Reminder',
    description: 'If no counselor comments or status changes are made to an active student or lead for 7 days, trigger a reminder task.',
    trigger: { type: 'Time-based', condition: 'No activity for 7 consecutive days' },
    action: { type: 'Create Task', params: 'Re-engage: No activity for 7 days with [lead name]' },
    isActive: true,
    lastTriggered: '2026-05-17T09:00:00Z',
    triggerCount: 15
  },
  {
    id: 'rule6',
    name: 'Webinar Registration → Send Confirmation',
    description: 'Send instant email/WhatsApp confirmation when a lead registers for a webinar.',
    trigger: { type: 'Webinar Event', condition: 'New registration received' },
    action: { type: 'Send WhatsApp', params: 'Webinar confirmation template' },
    isActive: false,
    lastTriggered: null,
    triggerCount: 0
  }
];

export default AUTOMATION_RULES;
