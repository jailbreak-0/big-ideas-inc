import { createClient } from './client';

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed: boolean;
  subscribed_at: string;
  unsubscribed_at: string | null;
  source: string;
  created_at: string;
}

/**
 * Subscribe an email to the newsletter
 * @param email - The email address to subscribe
 * @param source - The source of the subscription (default: 'footer')
 * @returns Success status and message
 */
export async function subscribeToNewsletter(
  email: string,
  source: string = 'footer'
): Promise<{ success: boolean; message: string; data?: NewsletterSubscriber }> {
  try {
    const supabase = createClient();

    // Check if email already exists
    const { data: existing, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('email', email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which is fine
      throw checkError;
    }

    if (existing) {
      // Email already exists
      if (existing.subscribed) {
        return {
          success: false,
          message: 'This email is already subscribed to our newsletter.',
        };
      } else {
        // Re-subscribe
        const { data, error } = await supabase
          .from('newsletter_subscribers')
          .update({
            subscribed: true,
            subscribed_at: new Date().toISOString(),
            unsubscribed_at: null,
          })
          .eq('email', email)
          .select()
          .single();

        if (error) throw error;

        return {
          success: true,
          message: 'Welcome back! You\'re subscribed again.',
          data,
        };
      }
    }

    // New subscription
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email, source }])
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      message: 'Thanks for subscribing! Check your inbox for exclusive deals.',
      data,
    };
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    return {
      success: false,
      message: error.message || 'Failed to subscribe. Please try again.',
    };
  }
}

/**
 * Unsubscribe an email from the newsletter
 * @param email - The email address to unsubscribe
 */
export async function unsubscribeFromNewsletter(
  email: string
): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = createClient();

    const { error } = await supabase
      .from('newsletter_subscribers')
      .update({
        subscribed: false,
        unsubscribed_at: new Date().toISOString(),
      })
      .eq('email', email);

    if (error) throw error;

    return {
      success: true,
      message: 'You have been unsubscribed from our newsletter.',
    };
  } catch (error: any) {
    console.error('Newsletter unsubscribe error:', error);
    return {
      success: false,
      message: error.message || 'Failed to unsubscribe. Please try again.',
    };
  }
}

/**
 * Check if an email is subscribed
 * @param email - The email address to check
 */
export async function isSubscribed(email: string): Promise<boolean> {
  try {
    const supabase = createClient();

    const { data } = await supabase
      .from('newsletter_subscribers')
      .select('subscribed')
      .eq('email', email)
      .single();

    return data?.subscribed ?? false;
  } catch (error) {
    return false;
  }
}
