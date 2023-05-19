//export const PostCard = ({ post }) => {
import './style.css';

export const PostCard = ({ post }) => {

    const { id, title, cover, body } = post;
    
    return (
        <div key={id} className='post' >
            <img src={cover} alt={title} />
            <div className='post-content'>
                <h1>{id} - {title}</h1>
                <p>{body}</p>
            </div>
        </div>
    )
}