module.exports = function (grunt) {
	grunt.loadNpmTasks("grunt-contrib-requirejs");
	grunt.loadNpmTasks("grunt-contrib-compass");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-regex-replace");

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		requirejs: {
			compile: {
				options: {
					baseUrl: "app",
					mainConfigFile: "app/main.js",
					out: "dist/js/app.js",
					name: "js/app",
					optimize: "uglify2"
				}
			}
		},
		compass: {
			dist: {
				options: {
					sassDir: "app/sass",
					cssDir: "dist/css",
					environment: "production"
				}
			},
			dev: {
				options: {
					sassDir: "app/sass",
					cssDir: "app/css"
				}
			}
		},
		copy: {
			requirejs: {
				src: "app/vendor/requirejs/require.js",
				dest: "dist/js/require.js"
			},
			other: {
				cwd: "app",
				src: [
					"index.html",
					"favicon.ico",
					"privacy.txt",
					"compatibility.html",
					"images/**",
					"errors/**",
					"js/modernizr-201406b.js",
					"js/startup.js"
				],
				dest: "dist",
				expand: true
			}
		},
		"regex-replace": {
			html: {
				src: ["dist/index.html"],
				actions: [
					{
						name: "requirejs",
						search: "<!-- Begin RequireJS -->"
						+ "[\\s\\S]+?<!-- End RequireJS -->",
						replace: "<script src=\"js/require.js\"></script>\n",
						flags: "g"
					}
				]
			}
		},
		watch: {
			compass: {
				files: "app/sass/**/*.scss",
				tasks: ["compass:dev"]
			}
		}
	});

	grunt.registerTask("default", [
		"requirejs",
		"compass:dist",
		"copy",
		"regex-replace"
	]);

	grunt.registerTask("sass", ["compass:dev"]);

};
