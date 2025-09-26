import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private usersRepo: Repository<User>,
		private jwtService: JwtService,
	) {}

	async register(username: string, password: string) {
		const existing = await this.usersRepo.findOne({ where: { username } });
		if (existing) throw new UnauthorizedException('User already exists');

		const hashed = await bcrypt.hash(password, 10);
		const user = this.usersRepo.create({ username, password: hashed });
		await this.usersRepo.save(user);

		const payload = { id: user.id, username: user.username };

		return {
			id: user.id,
			username: user.username,
			access_token: this.jwtService.sign(payload),
		};
	}

	async login(username: string, password: string) {
		const user = await this.usersRepo.findOne({ where: { username } });
		if (!user) throw new UnauthorizedException('Invalid credentials');

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) throw new UnauthorizedException('Invalid credentials');

		const payload = { id: user.id, username: user.username };
		return {
			id: user.id,
			username: user.username,
			access_token: this.jwtService.sign(payload),
		};
	}
}
