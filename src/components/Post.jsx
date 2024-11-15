/* eslint-disable react/prop-types */

export default function Post({ title, content, date, hour, children }) {
  return (
    <div className="px-3 py-2 my-4 postItem">
      <div className="d-flex align-items-center justify-content-between">
        <h5>{title}</h5>
        <p className="text-muted">{date}</p>
      </div>
      <p className="text-muted">{hour}</p>
      <p>{content}</p>
      {children}
    </div>
  );
}
