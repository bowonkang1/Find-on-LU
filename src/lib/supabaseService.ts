import { supabase } from './supabase';

// ==================== THRIFT ITEMS ====================

export async function getThriftItems() {
  const { data, error } = await supabase
    .from('thrift_items')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching thrift items:', error);
    throw error;
  }
  return data;
}

export async function createThriftItem(item: {
  title: string;
  description: string;
  price: number;
  category?: string;
  condition?: string;
  image_url?: string;
}) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('Not authenticated');
  
  const { data, error } = await supabase
    .from('thrift_items')
    .insert([
      {
        ...item,
        user_id: user.id,
        user_email: user.email,
        status: 'active'
      }
    ])
    .select();
  
  if (error) throw error;
  return data[0];
}

export async function updateThriftItem(id: string, updates: {
  title?: string;
  description?: string;
  price?: number;
  category?: string;
  condition?: string;
  status?: string;
}) {
  const { data, error } = await supabase
    .from('thrift_items')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating thrift item:', error);
    throw error;
  }
  return data[0];
}

export async function deleteThriftItem(id: string) {
  const { error } = await supabase
    .from('thrift_items')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting thrift item:', error);
    throw error;
  }
}

// ==================== LOST & FOUND ITEMS ====================

export async function getLostFoundItems() {
  const { data, error } = await supabase
    .from('lost_found_items')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching lost/found items:', error);
    throw error;
  }
  return data;
}

export async function createLostFoundItem(item: {
  title: string;
  description: string;
  type: 'lost' | 'found';
  location: string;
  date: string;
  image_url?: string;
}) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('Not authenticated');
  
  const { data, error } = await supabase
    .from('lost_found_items')
    .insert([
      {
        ...item,
        user_id: user.id,
        user_email: user.email,
        status: 'active'
      }
    ])
    .select();
  
  if (error) {
    console.error('Error creating lost/found item:', error);
    throw error;
  }
  return data[0];
}

export async function updateLostFoundItem(id: string, updates: {
  title?: string;
  description?: string;
  type?: 'lost' | 'found';
  location?: string;
  date?: string;
  status?: string;
}) {
  const { data, error } = await supabase
    .from('lost_found_items')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating lost/found item:', error);
    throw error;
  }
  return data[0];
}

export async function deleteLostFoundItem(id: string) {
  const { error } = await supabase
    .from('lost_found_items')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting lost/found item:', error);
    throw error;
  }
}