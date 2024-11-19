/* eslint-disable react/prop-types */

export default function PostCard({ post, date, hour, onClick, isExpanded, children }) {
  let splitContent = post.content.substring(0, 130);

  return (
    <div
      className="px-3 py-4 rounded col-md-5 col-sm-10 border"
      onClick={onClick}
    >
      <div className="d-flex align-items-start justify-content-between ">
        <h5>{post.title}</h5>
        <p className="text-muted">{date}</p>
        {children}
      </div>
      <p className="text-muted">{hour}</p>
      <p>{post.content.length > 100 && !isExpanded ? splitContent + "..." : post.content}</p>
      {post.image != undefined && (
        <img src={post.image} alt="image" style={{ width: "150px" }} />
      )}
    </div>
  );
}
