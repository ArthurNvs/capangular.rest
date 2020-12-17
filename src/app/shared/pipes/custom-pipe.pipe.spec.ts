import { CustomPipe } from './custom-pipe.pipe';

describe('CustomPipePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomPipe();
    expect(pipe).toBeTruthy();
  });
});
