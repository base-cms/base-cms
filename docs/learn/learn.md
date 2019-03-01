---
layout: page
title: Learn
permalink: /learn
has_children: true
nav_order: 1
has_toc: false
---

# Learn BaseCMS

Learn about core BaseCMS concepts like [authentication](/learn/authentication) and [account-group structure](/learn/account-group), or review a selection of [integration guides](/learn/guides) here.

## Topics

<div class="items">
  <div class="grid">
    {% assign pages_list = site.html_pages | sort:"nav_order" %}
    {% for node in pages_list %}
      {% if node.parent == 'Topics' %}
        <div class="tile">
          <a class="-with-icon" href="{{ node.url | absolute_url }}">
            {% if node.icon %}
            <img src="/assets/images/{{ node.icon }}">
            {% endif %}
            <span>{{ node.title }}</span>
          </a>
        </div>
      {% endif %}
    {% endfor %}
  </div>
</div>

## Guides

<div class="items">
  <div class="grid">
    {% assign pages_list = site.html_pages | sort:"nav_order" %}
    {% for node in pages_list %}
      {% if node.parent == 'Guides' %}
        <div class="tile">
          <a class="-with-icon" href="{{ node.url | absolute_url }}">
            {% if node.icon %}
            <img src="/assets/images/{{ node.icon }}">
            {% endif %}
            <span>{{ node.title }}</span>
          </a>
        </div>
      {% endif %}
    {% endfor %}
  </div>
</div>
