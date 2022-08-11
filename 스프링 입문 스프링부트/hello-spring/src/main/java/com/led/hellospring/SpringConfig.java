package com.led.hellospring;

import com.led.hellospring.repository.MemberRepository;
import com.led.hellospring.repository.MemoryMemberRepository;
import com.led.hellospring.service.MemberService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfig {

    @Bean // 스프링 빈에 등록한다.
    public MemberService memberService() {
        return new MemberService(memberRepository());
    }

    @Bean
    public MemberRepository memberRepository() {
        return new MemoryMemberRepository();
    }
}
