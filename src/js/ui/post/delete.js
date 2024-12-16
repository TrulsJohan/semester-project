import { deletePost } from '../../api/post/delete';

export async function onDeletePost() {
    if (confirm('are you sure you want to delete this post?')) {
        const deletion = await deletePost();
        if (deletion) {
            window.location.href = '/profile/profile.html';
            alert('Deleted post');
        } else {
            alert('Failed to delete post.');
        }
    }
}
