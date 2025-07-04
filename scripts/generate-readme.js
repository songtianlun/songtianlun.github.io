const fs = require('fs');

try {
    // Read projects.json
    const projectsData = JSON.parse(fs.readFileSync('projects.json', 'utf8'));

    // Generate README content
    const readmeContent = `
这是一份自动生成的个人业余开发项目清单，原始数据维护在 [\`project\`](https://github.com/songtianlun/songtianlun.github.io/tree/project) 分支下的 [\`projects.json\`](https://github.com/songtianlun/songtianlun.github.io/blob/project/projects.json) 文件中。

# 个人主页
- 个人博客：<https://frytea.com>
- 作品清单: <https://songtianlun.github.io>

# 业余开发项目清单

|                              名称                               | 简介                                         | 链接                                                                                                                        | 备注                     |
| :-----------------------------------------------------------: | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
${projectsData.map(project => {
        const name = project.name;
        const description = project.description || '';
        const year = project.year || '';
        const tags = project.tags ? project.tags.join('` `') : '';

        // Generate links
        const links = [];
        if (project.links.github) {
            links.push(`[Git](${project.links.github})`);
        }
        if (project.links.main) {
            links.push(`[入口](${project.links.main})`);
        }
        if (project.links.docs) {
            links.push(`[Docs](${project.links.docs})`);
        }
        if (project.links.article) {
            links.push(`[介绍文章](${project.links.article})`);
        }

        const linkStr = links.join(' ');
        const tagStr = tags ? `\`SINCE ${year}\` \`${tags}\`` : `\`SINCE ${year}\``;

        return `| ${project.links.main ? `[${name}](${project.links.main})` : name} | ${description} | ${linkStr} | ${tagStr} |`;
    }).join('\n')}

`;

    // Write to file
    fs.writeFileSync('README.new.md', readmeContent);
    console.log('✅ README.new.md generated successfully');
    console.log(`📊 Generated ${projectsData.length} projects`);

} catch (error) {
    console.error('❌ Error generating README:', error);
    process.exit(1);
}