import axios from 'axios';

const githubstalk = async (user) => {
  try {
    const { data } = await axios.get(`https://api.github.com/users/${user}`);
    return {
      username: data.login,
      nickname: data.name,
      bio: data.bio,
      id: data.id,
      nodeId: data.node_id,
      profile_pic: data.avatar_url,
      url: data.html_url,
      type: data.type,
      admin: data.site_admin,
      company: data.company,
      blog: data.blog,
      location: data.location,
      email: data.email,
      public_repo: data.public_repos,
      public_gists: data.public_gists,
      followers: data.followers,
      following: data.following,
      created_at: data.created_at,
      updated_at: data.updated_at
    };
  } catch (error) {
    throw new Error(`GitHub API error: ${error.response?.status} ${error.response?.statusText}`);
  }
};

export default githubstalk;