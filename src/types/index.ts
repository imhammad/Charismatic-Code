export interface SubscribeRequest {
  firstName: string;
  email: string;
  tagId: string;
  tagName: string;
  slug: string;
}

export interface SubscribeResponse {
  success: boolean;
  message: string;
}

export interface KitSubscriber {
  email_address: string;
  first_name: string;
  tags?: string[];
}
