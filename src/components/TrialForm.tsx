"use client";

import { FormEvent, useState } from "react";
import { products } from "@/lib/content";

type TrialFormProps = {
  defaultProduct?: string;
};

export function TrialForm({ defaultProduct = "" }: TrialFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="form-panel">
      <h2>申请试用</h2>
      <p className="form-note">
        表单先做本地占位，提交后不会联网发送。后续可接入邮箱、微信或后台。
      </p>

      {submitted ? (
        <div className="form-success" role="status">
          已记录你的申请意向。我们会尽快与你沟通试用方式。
        </div>
      ) : null}

      <form className="form-grid" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="name">称呼</label>
          <input id="name" name="name" required placeholder="怎么称呼你" />
        </div>
        <div className="field">
          <label htmlFor="contact">联系方式</label>
          <input
            id="contact"
            name="contact"
            required
            placeholder="微信 / 手机 / 邮箱"
          />
        </div>
        <div className="field">
          <label htmlFor="product">想试用的产品</label>
          <select id="product" name="product" defaultValue={defaultProduct}>
            <option value="">先聊聊，不确定</option>
            {products.map((product) => (
              <option key={product.slug} value={product.slug}>
                {product.name}
              </option>
            ))}
            <option value="custom">定制 / 其他需求</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="note">补充说明</label>
          <textarea
            id="note"
            name="note"
            rows={4}
            placeholder="业务场景、团队规模、期望时间等"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          提交申请
        </button>
      </form>
    </div>
  );
}
