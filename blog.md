---
layout: default
title: ブログ
lang: ja
---

<div class="hero">
  <div class="container">
    <h1>SpiceEngine Tech Blog</h1>
    <p>AIハードウェアアクセラレーション技術の最前線をお届けします</p>
  </div>
</div>

<div class="container">
  <section id="blog-posts">
    <h2>最新記事</h2>
    
    <div class="blog-grid">
      {% for post in site.posts %}
      <article class="blog-card">
        <div class="blog-meta">
          <span class="blog-date">{{ post.date | date: "%Y年%m月%d日" }}</span>
          {% if post.categories %}
          <span class="blog-category">{{ post.categories.first }}</span>
          {% endif %}
        </div>
        
        <h3 class="blog-title">
          <a href="{{ post.url }}">{{ post.title }}</a>
        </h3>
        
        <p class="blog-excerpt">
          {{ post.excerpt | strip_html | truncatewords: 30 }}
        </p>
        
        {% if post.tags %}
        <div class="blog-tags">
          {% for tag in post.tags limit: 3 %}
          <span class="blog-tag"># {{ tag }}</span>
          {% endfor %}
        </div>
        {% endif %}
        
        <div class="blog-read-more">
          <a href="{{ post.url }}" class="btn-read-more">続きを読む</a>
        </div>
      </article>
      {% endfor %}
    </div>
    
    {% if site.posts.size == 0 %}
    <div class="no-posts">
      <p>まだ記事がありません。近日中に技術記事を公開予定です。</p>
    </div>
    {% endif %}
  </section>
</div>

<style>
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2.5rem;
    margin-top: 2rem;
  }

  .blog-card {
    background: linear-gradient(145deg, var(--light-bg), var(--pale-green));
    padding: 2rem;
    border-radius: 16px;
    border: 1px solid var(--border-color);
    box-shadow: 0 8px 24px rgba(46, 125, 50, 0.15);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .blog-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--accent-color), var(--light-green));
  }

  .blog-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 16px 40px rgba(46, 125, 50, 0.25);
  }

  .blog-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  .blog-date {
    color: var(--secondary-color);
    font-weight: 500;
  }

  .blog-category {
    background: var(--accent-color);
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .blog-title {
    margin-bottom: 1rem;
  }

  .blog-title a {
    color: var(--primary-color);
    text-decoration: none;
    font-size: 1.3rem;
    font-weight: 600;
    line-height: 1.4;
    transition: color 0.3s ease;
  }

  .blog-title a:hover {
    color: var(--accent-color);
  }

  .blog-excerpt {
    color: var(--text-color);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .blog-tags {
    margin-bottom: 1.5rem;
  }

  .blog-tag {
    display: inline-block;
    background: var(--light-green);
    color: var(--primary-color);
    padding: 0.2rem 0.6rem;
    border-radius: 12px;
    font-size: 0.8rem;
    margin-right: 0.5rem;
    margin-bottom: 0.3rem;
  }

  .btn-read-more {
    display: inline-block;
    color: var(--accent-color);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    position: relative;
  }

  .btn-read-more::after {
    content: ' →';
    transition: transform 0.3s ease;
  }

  .btn-read-more:hover {
    color: var(--secondary-color);
  }

  .btn-read-more:hover::after {
    transform: translateX(5px);
  }

  .no-posts {
    text-align: center;
    padding: 3rem;
    background: var(--light-bg);
    border-radius: 12px;
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    .blog-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .blog-card {
      padding: 1.5rem;
    }

    .blog-meta {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  }
</style>