export enum UserType {
    USER = "user",
    ADMIN = "admin",
    MOD = "moderator"
}

export enum Task_Status {
    COMPLETE = "complete",
    PENDING = "pending",
    ANALYZING = "analyzing",
    FAILED = "failed"
}
export enum Ticket_Priority {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High'
}

export type Ticket = {
  title: string;
  description: string;
};

export type TicketAnalysis = {
  summary: string;
  priority: 'low' | 'medium' | 'high';
  helpfulNotes: string;
  relatedSkills: string[];
};