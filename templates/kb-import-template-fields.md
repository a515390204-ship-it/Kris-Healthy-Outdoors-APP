# 知识库 Excel / CSV 导入模板说明

模板文件：

- `templates/kb-import-template.csv`

这份模板可以直接用 Excel 打开和编辑。

## 字段说明

- `id`
  内容唯一 ID，建议不要重复。

- `module`
  可选值：
  `outdoor` / `nutrition` / `supplements` / `pets` / `knowledge-anxiety` / `social-anxiety`

- `title`
  站内标题。

- `summary`
  简要摘要。

- `tags`
  标签字段，多个值用 `|` 分隔。
  例：`杭州|九溪|春季|徒步`

- `season`
  可选值：
  `spring` / `summer` / `autumn` / `winter`

- `city`
  城市名。

- `source_type`
  可选值：
  `xiaohongshu` / `official` / `editorial` / `other`

- `source_title`
  来源标题。

- `source_url`
  原始链接。

- `source_author`
  作者昵称或来源作者。

- `source_published_at`
  来源发布时间，建议格式：
  `2026-04-13`

- `route_ascent`
  从哪里上山。

- `route_pass_by`
  途中经过点，多个值用 `|` 分隔。

- `route_descent`
  怎么下山。

- `route_duration`
  建议时长。

- `route_difficulty`
  路线难度。

- `media_cover_image`
  封面图地址。

- `media_gallery`
  多图地址，多个值用 `|` 分隔。

- `notes_experience`
  用户体感、经验补充、踩坑提醒。

- `quality_verified`
  是否已校验，填：
  `true` 或 `false`

- `quality_confidence`
  可选值：
  `low` / `medium` / `high`

- `workflow_status`
  可选值：
  `draft` / `approved` / `needs_revision` / `rejected`

- `workflow_reviewer`
  审核人。

- `workflow_review_note`
  审核备注。

- `workflow_imported_from`
  建议填写：
  `manual-xiaohongshu` / `api` / `import`

- `workflow_updated_at`
  更新时间，建议 ISO 格式：
  `2026-04-13T10:00:00.000Z`

## 使用建议

1. 先复制示例行，再批量补内容。
2. 多值字段统一用 `|` 分隔，不要混用逗号。
3. 空字段可以留空。
4. 导入前最好先检查 `id` 是否唯一。

## 后续接入建议

如果你下一步要做真正的“Excel/CSV 批量导入到知识库”，建议把这份模板接到一个解析脚本里，规则是：

- `tags` 拆成数组
- `route_pass_by` 拆成数组
- `media_gallery` 拆成数组
- `quality_verified` 转成布尔值
- 其他字段按字符串写入
