// 简化的用户管理，使用localStorage存储用户ID
export function getUserId(): string {
  if (typeof window === 'undefined') return '';
  
  let userId = localStorage.getItem('dreams_exit_user_id');
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('dreams_exit_user_id', userId);
  }
  return userId;
}

export function generateNewUserId(): string {
  const userId = crypto.randomUUID();
  localStorage.setItem('dreams_exit_user_id', userId);
  return userId;
}
