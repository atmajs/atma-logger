module.exports = {
	suites: {
		node: {
			env: 'lib/logger-dev.js::Logger',
			tests: 'test/**test',
			
			$config: {
				$before: function(){
					var buf = [];
					
					global.LogStream = {
						buf: buf,
						write: buf.push.bind(buf),
					};
					Logger.cfg({
						transport: {
							type: 'stream',
							stream: LogStream
						}
					});
				}
			}
		}
	}
};