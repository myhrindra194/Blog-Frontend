/* eslint-disable react/prop-types */

export default function PostCard({
  title,
  content,
  date,
  hour,
  image,
  onClick,
  children,
}) {
  let splitContent = content.substring(0, 130);
  

  return (
    <div
      className="px-3 py-4 rounded col-md-5 col-sm-10 border"
      onClick={onClick}
    >
      <div className="d-flex align-items-start justify-content-between ">
        <h5>{title}</h5>
        <p className="text-muted">{date}</p>
        {children}
      </div>
      <p className="text-muted">{hour}</p>
      <p>{content.length > 100 ? splitContent + "..." : content}</p>
      {(image != undefined) && <img src={image} alt="image" style={{width:"150px"}}/>}

    </div>
  );
}
