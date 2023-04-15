import jsBeautify from 'js-beautify';

const options = {
  indent_size: 2,
  preserve_newlines: false,
  extra_liners: []
}

const vitePluginHtmlBeautify = () => ({
  name: 'vite-plugin-html-beautify',
  transformIndexHtml(html) {
    return jsBeautify.html_beautify(html, options);
  },
});

export default vitePluginHtmlBeautify;