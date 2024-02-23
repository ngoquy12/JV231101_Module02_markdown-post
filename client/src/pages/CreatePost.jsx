import React, { useEffect, useState } from "react";
import { Button, Input, Select } from "antd";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import baseUrl from "../api/axios";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [postName, setPostName] = useState("");
  const [thumbnail, setThambnail] = useState("");

  // Lấy ra giá trị của select khi onChange
  const handleChange = (value) => {
    setCategoryId(value);
  };

  const mdParser = new MarkdownIt(/* Markdown-it options */);

  // Hàm lấy giá trị bên trong Markdown
  function handleEditorChange({ html }) {
    // Cập nhật lại giá trị của nội dung khi onChange
    setContent(html);
  }

  (function a() {}); // IIFE

  // function * => Generator function

  // Hàm lấy danh sách danh mục bài viết
  const loadCategory = () => {
    baseUrl
      .get("categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err))
      .finally(() => console.log("Kết thúc gọi API"));
  };

  useEffect(() => {
    loadCategory();
  }, []);

  // lắng nghe sự kiện submit form thêm mới bài viết
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate dữ liệu đầu vào => Tự làm
    // Tạo đối tượng post
    const post = {
      post_name: postName,
      post_image: thumbnail,
      category: categoryId,
      content: content,
      created_at: new Date(),
      update_at: "Ngọ Văn Quý",
    };

    // Gọi API thêm mới dữ liệu
    baseUrl
      .post("posts", post)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => console.log("Kết thúc gọi API"));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên bài viêt</label>
          <Input
            value={postName}
            onChange={(e) => setPostName(e.target.value)}
          />
        </div>
        <div>
          <label>Hình ảnh</label>
          <Input
            value={thumbnail}
            onChange={(e) => setThambnail(e.target.value)}
          />
        </div>
        <div>
          <label>Tên danh mục</label>
          <Select
            defaultValue={categories[0]?.id}
            placeholder={categories[0]?.category_name}
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={categories.map((category) => ({
              value: category.id,
              label: category.category_name,
            }))}
          />
        </div>
        <div>
          <label>Nội dung</label>
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
        </div>
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <Button htmlType="submit" type="primary">
            Thêm mới
          </Button>
        </div>
      </form>
    </>
  );
}
