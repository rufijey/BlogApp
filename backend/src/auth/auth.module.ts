import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		PassportModule,
		JwtModule.register({
			secret: 'super-secret-key',
			signOptions: { expiresIn: '1h' },
		}),
	],
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {}
