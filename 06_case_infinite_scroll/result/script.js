; (function () {
  'use strict'

  const get = function (target) {
    return document.querySelector(target)
  }

  let currentPage = 1
  let total = 10
  const limit = 10
  const end = 100  //총갯수

  const $posts = get('.posts')
  const $loader = get('.loader')

  // 데이터 로딩이 완료되면 hide
  const hideLoader = () => {
    $loader.classList.remove('show')
  }

  // 데이터 로딩시 불러오는 css
  const showLoader = () => {
    $loader.classList.add('show')
  }


  //포스트 보여주는 CSS
  const showPosts = (posts) => {
    posts.forEach((post) => {
      const $post = document.createElement('div')
      $post.classList.add('post')
      $post.innerHTML = `
          <div class="header">
            <div class="id">${post.id}.</div>
            <div class="title">${post.title}</div>
          </div>
          <div class="body">${post.body}</div>
      `
      $posts.appendChild($post)
    })
  }

  //포스트 요청 
  const getPosts = async (page, limit) => {
    const API_URL = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('에러가 발생했습니다.')
    }
    return await response.json()
  }

  //포스트 로딩
  const loadPosts = async (page, limit) => {
    showLoader()
    try {
      const response = await getPosts(page, limit);
      showPosts(response)
    } catch (error) {
      console.error(error.message);
    } finally {
      hideLoader()
    }
  }

  //스크롤 제어 
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    if (total === end) {
      //scroll event 멈춤
      window.removeEventListener('scroll', handleScroll)
      return
    }

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      currentPage++
      total += 10
      loadPosts(currentPage, limit)
      return
    }
  }

  //초기시작
  window.addEventListener('DOMContentLoaded', () => {
    loadPosts(currentPage, limit)
    window.addEventListener('scroll', handleScroll)
  })
})()