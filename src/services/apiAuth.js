import supabase from './supabase';
import { supabaseUrl } from './supabase';
export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });
  if (error) {
    // console.error('Error signing up:', error.message);
    throw new Error('Error signing up');
  }
  return data;
}
export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    // console.error('Error logging in:', error.message);
    throw new Error('Error logging in');
  }
  console.log(data);
  return data;
}

export async function getCurrentUser() {
  // 用来获取当前用户会话  来自于 Supabase Auth 同时在本地也有存储
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  // 如果存在 不从本地存储中拿 而是去 Supabase 服务器获取最新的用户信息 保证数据安全和一致性
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    // console.error('Error fetching user:', error.message);
    throw new Error('Error fetching user');
  }
  return data?.user;
}
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    // console.error('Error logging out:', error.message);
    throw new Error('Error logging out');
  }
}
export async function updateUserData({ fullName, avatar, password }) {
  // 更新用户全名 或者 更新密码
  let updateData;
  if (fullName) updateData = { data: { fullName } };
  if (password) updateData = { password };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    // console.error('Error updating user data:', error.message);
    throw new Error('Error updating user data');
  }
  if (!avatar) return data;

  //上传头像
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage.from('avatars').upload(fileName, avatar);
  if (storageError) {
    // console.error('Error uploading avatar:', storageError.message);
    throw new Error('Error uploading avatar');
  }
  //更新头像 将上传后的头像路径存储到用户信息中
  const { data: updatedUser, error: updateError } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (updateError) {
    throw new Error('Error updating avatar URL in user data');
  }
  return updatedUser;
}
